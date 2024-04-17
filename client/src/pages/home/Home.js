import React, {useState} from 'react';
import {Container, AddButton} from './Home.style';
import Modal from '../../components/modal/Modal';
import { useGetUsersHook } from '../../hooks/useUsersHooks';

const Home = () => {
  const [isModal, setIsModal] = useState(false);
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized, usersList } = useGetUsersHook();

  return (
      <Container>
       Home
      </Container>
  );
};

export default Home;