import { Outlet } from 'react-router-dom';
import TeacherStyled from './teacher.styled.tsx';

const Teacher = () => {
  return (
    <TeacherStyled>
      Teacher router
      <Outlet />
    </TeacherStyled>
  );
};

export default Teacher;
