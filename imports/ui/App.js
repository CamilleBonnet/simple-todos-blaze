import './App.html';
import './MainContainer.js';
import './Login.js';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.mainContainer.helpers({
  isUserLogged() {
    return isUserLogged();
  }
});