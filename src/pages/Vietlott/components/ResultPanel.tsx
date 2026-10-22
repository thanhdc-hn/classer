import { ClearOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { MAX_SAVED } from '../constants.ts';
import { SavedTicket } from '../types.ts';
import ResultItem from './ResultItem.tsx';

interface Props {
  tickets: SavedTicket[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const ResultPanel = ({ tickets, onRemove, onClear }: Props) => {
  return (
    <aside className="card result-panel">
      <div className="panel-head">
        <h3>
          Dãy số đã lưu{' '}
          <span className="count">
            ({tickets.length}/{MAX_SAVED})
          </span>
        </h3>
        <Popconfirm
          title="Xoá tất cả dãy số đã lưu?"
          description="Hành động này không thể hoàn tác."
          okText="Xoá tất cả"
          cancelText="Huỷ"
          okButtonProps={{ danger: true }}
          disabled={tickets.length === 0}
          onConfirm={onClear}
        >
          <Button
            size="small"
            className="clear-btn"
            danger
            icon={<ClearOutlined />}
            disabled={tickets.length === 0}
          >
            Xoá tất cả
          </Button>
        </Popconfirm>
      </div>

      {tickets.length === 0 ? (
        <p className="empty-hint">
          Chưa có dãy số nào. Kết quả quay sẽ được tự động lưu tại đây.
        </p>
      ) : (
        <div className="ticket-list">
          {tickets.map((t) => (
            <ResultItem key={t.id} ticket={t} onRemove={onRemove} />
          ))}
        </div>
      )}
    </aside>
  );
};

export default ResultPanel;
