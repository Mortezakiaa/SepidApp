import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// @mui
import { Paper, Stack, Button } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
//
import KanbanAddTask from './KanbanTaskAdd';
import KanbanTaskCard from './KanbanTaskCard';
import KanbanColumnToolBar from './KanbanColumnToolBar';

// ----------------------------------------------------------------------

type KanbanColumnPropTypes = {
  column: any;
  index: number;
};

export default function KanbanColumn({ column, index }: KanbanColumnPropTypes) {
  const { enqueueSnackbar } = useSnackbar();

  // const { board } = useSelector((state) => state.kanban);

  const [open, setOpen] = useState(false);

  const { name, cardIds, id } = column;

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

  const handleDeleteTask = (cardId) => {};

  const handleUpdateColumn = async (newName) => {
    try {
      if (newName !== name) {
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = (task) => {
    handleCloseAddTask();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgcolor: 'grey.5008' }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <KanbanColumnToolBar columnName={name} onDelete={handleDeleteColumn} onUpdate={handleUpdateColumn} />

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2} width={280}>
                  {cardIds.map((cardId, index) => (
                    <KanbanTaskCard key={cardId} onDeleteTask={handleDeleteTask} card={0} index={index} />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Stack spacing={2} sx={{ pb: 3 }}>
              {open && <KanbanAddTask onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />}

              <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              >
                Add Task
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
