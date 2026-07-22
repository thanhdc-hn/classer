import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';

interface Props {
  onAdd: (name: string) => boolean;
  existingNames: string[];
}

const AddPlayerForm = ({ onAdd, existingNames }: Props) => {
  const [name, setName] = useState('');

  const trimmed = name.trim();
  const isDuplicate = existingNames.some(
    (n) => n.toLowerCase() === trimmed.toLowerCase(),
  );
  const canAdd = trimmed.length > 0 && !isDuplicate;

  const handleAdd = () => {
    if (!canAdd) return;
    if (onAdd(trimmed)) setName('');
  };

  return (
    <div className="add-player-form">
      <Input
        placeholder="Tên người chơi"
        value={name}
        maxLength={20}
        status={isDuplicate ? 'error' : undefined}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={handleAdd}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={!canAdd}
        onClick={handleAdd}
      >
        Thêm
      </Button>
    </div>
  );
};

export default AddPlayerForm;
