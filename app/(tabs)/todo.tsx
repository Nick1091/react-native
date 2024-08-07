import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

type TodoType = {
  key: string;
  text: string;
};

export default function HomeScreen() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = () => {
    if (todo.length > 0) {
      setTodos((prev) => [...prev, { key: `${todos.length + 1}`, text: todo }]);
      setTodo('');
    }
  };

  const removeTodo = (key: string) => {
    setTodos((prev) => prev.filter((todo) => todo.key !== key));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Todo"
        onChangeText={setTodo}
        value={todo}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <Button title="Remove" onPress={() => removeTodo(item.key)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  todoText: {
    fontSize: 18,
  },
});
