import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const BottomNavigationBar = (props: Props) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('HomeScreen');

  const handlePress = screenName => {
    setActiveTab(screenName);
    navigation.navigate(screenName);
  };

  const renderTab = (screenName, label) => {
    const isActive = activeTab === screenName;

    return (
      <TouchableOpacity
        key={screenName}
        style={[
          styles.tab,
          {
            backgroundColor: isActive ? '#355578' : 'transparent',
          },
        ]}
        onPress={() => handlePress(screenName)}>
        <Text style={[styles.tabText, {color: isActive ? '#fff' : '#bbb'}]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 50,
          backgroundColor: '#283e58',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          width: '93%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderColor: '#2E5F66',
          alignItems: 'center',
          marginBottom: 1,
          overflow: 'hidden',
        }}>
        {renderTab('HomeScreen', 'Home')}
        {renderTab('BlogHomeScreen', 'Blogs')}
        {renderTab('AddBlogFormScreen', 'Add Blog')}
      </View>
    </View>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({
  tab: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 23,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 23,
  },
  tabText: {
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});
