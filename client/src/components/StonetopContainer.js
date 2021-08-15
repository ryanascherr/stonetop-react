import React, {useState} from 'react';
import NavTabs from './NavTabs';
import Footer from './Footer';
import Header from './Header';
import Homepage from './Homepage';
import Playbook from '../pages/Playbook';
import Background from '../pages/Background';
import Drive from '../pages/Drive';
import Origin from '../pages/Origin';
import Stat from '../pages/Stat';
import Finalize from '../pages/Finalize';
import "../style.css";
import Auth from '../utils/auth';

export default function StonetopContainer() {

  const [currentPage, setCurrentPage] = useState('');

  const renderPage = () => {
    if (currentPage === 'Background') {
      return <Background />;
    }
    if (currentPage === 'Drive') {
      return <Drive />;
    }
    if (currentPage === 'Origin') {
      return <Origin />;
    }
    if (currentPage === 'Stat') {
      return <Stat />;
    }
    if (currentPage === 'Finalize') {
      return <Finalize />;
    }
    return <Playbook />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  let landingPage = "";
  let render;

  if (Auth.loggedIn()) {
    landingPage = <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
    render = renderPage();

  } else {
    landingPage = <Homepage />
  }

  return (
    <div>
        <Header />
        {landingPage}
        {render}
        <Footer />
    </div>
  );
}