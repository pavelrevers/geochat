import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';

const Link = ({to, params, changePage, children}) => (
  <TouchableHighlight onPress={() => changePage({name: to, params})}>
    {children}
  </TouchableHighlight>
);

export default Link;
