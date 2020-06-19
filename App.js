import React, { useEffect } from "react";
import {
  StyleSheet,
  // Text,
  View,
  Button,
  TextInput,
  ViewBase,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Text, FAB } from 'react-native-paper'
import TodoListComponent from "./src/TodoListComponent";
import AddNotes from "./src/AddNotes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <RootScreen />
    </PaperProvider>
  );
}

function NewHowe(){
  return (
    <View style={styles2.container}>
      <View style={styles2.titleContainer}>
        <Text style={styles2.title}>You do not have any notes</Text>
      </View>
      <FAB
        style={styles2.fab}
        small
        icon='plus'
        label='Add new note'
        onPress={() => navigation.navigate('AddNotes')}
      />
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  }
})

function RootScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3e84e0",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Todo"
          component={TodoListComponent}
          options={{ title: "Overview" }}
        />
        <Stack.Screen
          name="AddNotes"
          component={AddNotes}
          options={{ title: "Add Notes" }}
        />        
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42 }}
          options={({ route }) => ({
            title: route.params.name,
            // headerStyle: {
            //   backgroundColor: '#f4511e',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
          })}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({ title: 'hola' })}
        />
        {/* <Stack.Screen name="CreatePost" component={CreatePostScreen} options={({route}) => ({title: route.params.name})} />   */}
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={({ route }) => {
            console.dir(route);
            return { title: "many" };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation, route }) {
  useEffect(() => {
    if (route.params?.post) {
      console.log("hello luka");
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Button
        title="Go details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          })
        }
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <FAB
        style={styles2.fab}
        small
        icon='plus'
        label='Add new note'
        onPress={() => navigation.navigate('Todo')}
      />
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("Home", { post: postText, name: "Crea tu post" });
        }}
      />
    </>
  );
}

function DetailsScreen({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go to Home"
        onPress={() =>
          navigation.navigate("Home", { name: "estos son los detalles" })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    // padding: 50
  },
});
