import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

export default function Contacts({ contacts, currentUser,changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      } catch (error) {
        // Handle errors if any
      }
    };
  
    fetchData();
  
    // Cleanup function (if needed)
    // For now, since there's no cleanup, you can omit the return statement.
    // return () => {
    //   // Cleanup code here
    // };
  }, []);
  

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  console.log(contacts)
  
  const svgDataUri = `data:image/svg+xml,${encodeURIComponent(currentUserImage)}`;
  // const svgDataUriContacts = `data:image/svg+xml,${encodeURIComponent(avatarImage)}`;
  // console.log(svgDataUriContacts);
  return (
    <>
  
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Talkify</h3>
          </div>
          <div className="contacts">
          {/* {contacts.map((contact, index) => (
  <div
    key={contact._id}
    className={`contact ${index === currentSelected ? 'selected' : ''}`}
    onClick={() => changeCurrentChat(index, contact)}
  >
    <div className="avatar">
      <img
        src={`data:image/svg+xml;${encodeURIComponent(contact.avatarImage)}`}
        alt="top      "/>
        {/* <img src={svgDataUriContacts} alt='avatar'/> 
        
      
    </div>
    <div className="username">
      <h3>{contact.username}</h3>
    </div>
  </div>
))} */}






{/* since you cant put const svg = encode URI componet in this or it will render as if it a element written in it 
so for that use a return in the call back funtion to 
then you can use const to pass the value  */}
{/* 
{contacts.map((contact, index) => (
  <div
    key={contact._id}
    
    className={`contact ${index === currentSelected ? 'selected' : ''}`}
    onClick={() => changeCurrentChat(index, contact)}
  >
    <div className="avatar">
    const svgDataUriContacts = `data:image/svg+xml,${encodeURIComponent(contact.avatarImage)}`;

      <img
        src={contact.avatarImage}
        alt="avatar"s
      />
      <img src={contact.avatarImage} alt='avatar'/> 
    </div>
    <div className="username">
      <h3>{contact.username}</h3>
    </div>
  </div>
))} */}


{contacts.map((contact, index) => {
  const svgDataUriContacts = `data:image/svg+xml,${encodeURIComponent(contact.avatarImage)}`;

  return (
    <div
      key={contact._id}
      className={`contact ${index === currentSelected ? 'selected' : ''}`}
      onClick={() => changeCurrentChat(index, contact)}
    >
      <div className="avatar">
        <img src={svgDataUriContacts} alt='avatar'/>
      </div>
      <div className="username">
        <h3>{contact.username}</h3>
      </div>
    </div>
  );
})}




    </div>
          <div className="current-user">
            <div className="avatar">
             
              {/* <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avat2983929ar" /> */}
              <img src={svgDataUri} alt='avatar'/>
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }

     .selected {
       background-color: #9a86f3;
     }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

`;
