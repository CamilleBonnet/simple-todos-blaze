// @ts-nocheck
import { Template } from 'meteor/templating';
import { TasksCollection } from "../api/TasksCollection";
import { ReactiveDict } from 'meteor/reactive-dict';

import './Task.js';
import './Form.js';

import './MainContainer.html';

const HIDE_COMPLETED_STRING = "hideCompleted";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.events({
  "click #hide-completed-button"(event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted)
  }
});

Template.mainContainer.helpers({
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const hideCompletedFilter = { isChecked: { $ne: true } };

    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  },

  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },

  incompleteCount() {
    const incompleteTasksCount = TasksCollection.find({ isChecked: { $ne: true } }).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : '';
  },
});
