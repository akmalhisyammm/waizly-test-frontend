import { Checkbox, HStack, IconButton, Input } from '@chakra-ui/react';
import { FaSave, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

type TodoCardProps = {
  mode: 'view' | 'create' | 'update';
  value: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle?: () => void;
  onDismiss: () => void;
  onAfterCreate?: () => void;
  onBeforeUpdate?: () => void;
  onAfterUpdate?: () => void;
  onBeforeDelete?: () => void;
  isCompleted?: boolean;
};

const TodoCard = ({
  mode,
  value,
  defaultValue,
  onChange,
  onToggle,
  onDismiss,
  onAfterCreate,
  onBeforeUpdate,
  onAfterUpdate,
  onBeforeDelete,
  isCompleted,
}: TodoCardProps) => {
  return mode === 'view' ? (
    <HStack
      justifyContent="space-between"
      padding={4}
      borderWidth={1}
      borderRadius={6}
      gap={4}>
      <Checkbox
        textDecoration={isCompleted ? 'line-through' : 'none'}
        wordBreak="break-word"
        isChecked={isCompleted}
        onChange={onToggle}>
        {defaultValue}
      </Checkbox>
      <HStack>
        <IconButton
          aria-label="Edit todo"
          colorScheme="yellow"
          icon={<FaEdit />}
          onClick={onBeforeUpdate}
        />
        <IconButton
          aria-label="Delete todo"
          colorScheme="red"
          icon={<FaTrash />}
          onClick={onBeforeDelete}
        />
      </HStack>
    </HStack>
  ) : (
    <HStack
      justifyContent="space-between"
      padding={4}
      borderWidth={1}
      borderRadius={6}>
      <Input placeholder="Todo title" value={value} onChange={onChange} />
      <HStack>
        <IconButton
          aria-label="Save todo"
          colorScheme="green"
          icon={<FaSave />}
          onClick={mode === 'create' ? onAfterCreate : onAfterUpdate}
        />
        <IconButton
          aria-label="Cancel todo"
          icon={<FaTimes />}
          onClick={onDismiss}
        />
      </HStack>
    </HStack>
  );
};

export default TodoCard;
