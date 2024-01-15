type FindOptionsWhereProperty<
  PropertyToBeNarrowed,
  Property = PropertyToBeNarrowed
> = PropertyToBeNarrowed extends Promise<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : PropertyToBeNarrowed extends Array<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : PropertyToBeNarrowed extends () => void
  ? never
  : PropertyToBeNarrowed extends Buffer
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends Date
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends ObjectId
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends string
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends number
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends boolean
  ? Property | FindOperator<Property>
  : PropertyToBeNarrowed extends object
  ? FindOptionsWhere<Property> | FindOptionsWhere<Property>[] | EqualOperator<Property> | FindOperator<any> | boolean
  : Property | FindOperator<Property>;
/**
 * Used for find operations.
 */
type FindOptionsWhere<Entity> = {
  [P in keyof Entity]?: P extends 'toString' ? unknown : FindOptionsWhereProperty<NonNullable<Entity[P]>>;
};

type FindOptionsSelectProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsSelectProperty<I> | boolean
  : Property extends Array<infer I>
  ? FindOptionsSelectProperty<I> | boolean
  : Property extends string
  ? boolean
  : Property extends number
  ? boolean
  : Property extends boolean
  ? boolean
  : Property extends () => void
  ? never
  : Property extends Buffer
  ? boolean
  : Property extends Date
  ? boolean
  : Property extends ObjectId
  ? boolean
  : Property extends object
  ? FindOptionsSelect<Property>
  : boolean;
/**
 * Select find options.
 */
type FindOptionsSelect<Entity> = {
  [P in keyof Entity]?: P extends 'toString' ? unknown : FindOptionsSelectProperty<NonNullable<Entity[P]>>;
};

type FindOptionsRelationsProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
  : Property extends Array<infer I>
  ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
  : Property extends object
  ? FindOptionsRelations<Property> | boolean
  : boolean;
/**
 * Relations find options.
 */
type FindOptionsRelations<Entity> = {
  [P in keyof Entity]?: P extends 'toString' ? unknown : FindOptionsRelationsProperty<NonNullable<Entity[P]>>;
};

type QueryParams<T> = T extends Array<infer U>
  ? {
      take?: number;
      page?: number;
      sort?: object;
      relation?: FindOptionsRelations<U>;
      select?: FindOptionsSelect<U>;
      filter?: FindOptionsWhere<U>[] | FindOptionsWhere<U>;
    }
  : {
      take?: number;
      page?: number;
      sort?: object;
      relation?: FindOptionsRelations<T>;
      select?: FindOptionsSelect<T>;
      filter?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
    };

interface ResponseModel<T> {
  statusCode: number;
  data: T extends any[] ? BulkDataRes<T> : T;
  error: boolean;
  errorData: any;
}

interface BulkDataRes<T> {
  result: T;
  pagination: {
    currentPage?: number;
    nextPage?: number;
    prevPage?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    lastPage?: number;
    count?: number;
    take?: number;
  };
}
