import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { CSSProperties } from 'react';
import { GAMES, getBallColor } from '../constants.ts';
import { SavedTicket } from '../types.ts';

interface Props {
  ticket: SavedTicket;
  onRemove: (id: string) => void;
}

const ResultItem = ({ ticket, onRemove }: Props) => {
  return (
    <div className="ticket">
      <div className="ticket-meta">
        <span className="ticket-game">{GAMES[ticket.game].label}</span>
        <span className="ticket-time">
          {dayjs(ticket.at).format('HH:mm DD/MM')}
        </span>
      </div>
      <div className="ticket-balls">
        {ticket.numbers.map((n) => (
          <span
            key={n}
            className="ball"
            style={{ '--ball-color': getBallColor(n) } as CSSProperties}
          >
            {String(n).padStart(2, '0')}
          </span>
        ))}
      </div>
      <Popconfirm
        title="Xoá dãy số này?"
        okText="Xoá"
        cancelText="Huỷ"
        okButtonProps={{ danger: true }}
        onConfirm={() => onRemove(ticket.id)}
      >
        <Button
          size="small"
          danger
          type="text"
          icon={<DeleteOutlined />}
          aria-label="Xoá dãy số"
        />
      </Popconfirm>
    </div>
  );
};

export default ResultItem;
