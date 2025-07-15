"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { AnimatePresence, easeInOut } from "motion/react";
import { motion } from "motion/react";

interface task {
  id: number;
  text: string;
  completed: boolean;
}
// je type mon interface task, ici j'ai un id pour différencier chaque task, un text,
// et un boolean pour savoir si ma task est faite ou non

export default function ToDoApp() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<task[]>([]);
  // mon useState tasks avec le typage "task" qui va lui stocker un tableau
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [savedTasks, setSavedTasks] = useState<boolean>(false);

  useEffect(() => {
    setSavedTasks(true);
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as task[]);
    }
  }, []);

  useEffect(() => {
    if (savedTasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, savedTasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClick(e);
  };

  const handleClick = (e: any) => {
    if (inputValue === "") {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
      return;
    }
    const newTask: task = {
      // création d'une variable newTask typé par "task"
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    // ajoute la nouvelle tâche à la liste existante et met à jour le state
    setInputValue("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // // Supprime la tâche dont l'id correspond à celui cliqué
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="xl:flex xl:flex-col xl:justify-center xl:items-center">
        <h1 className="text-[#797979] font-manrope font-bold text-[28px] xl:text-5xl ">
          Good Morning ☀️
        </h1>
        <h2 className="text-white text-[24px] xl:text-4xl xl:mt-2 font-manrope font-bold ">
          Start Your Journey <span className="text-[#EB6F6F] ">Right</span>
        </h2>
      </div>
      <AnimatePresence>
        {isAlertVisible && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="absolute overflow-hidden top-10 left-10 text-white font-manrope bg-white/5 rounded-lg p-3 border-1 border-[#EB6F6F] max-w-sm"
          >
            <h4 className="font-bold text-center text-lg ">
              Don't leave it empty — take action!
            </h4>
            <p className="font-regular text-center mt-1 text-sm">
              Write down just one small task and start moving.
            </p>
            <p className="text-center text-2xl mt-2">🔴</p>
            <div className="w-full h-10 left-0 absolute bg-gradient-to-r from-red-300 to bg-red-900 blur-[140px] rounded-full"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <form
        onSubmit={handleSubmit}
        className="mt-12 flex items-center gap-4 xl:max-w-xl xl:mx-auto"
      >
        <Input
          className="border-1 border-white/20 font-manrope font-bold"
          placeholder="do your task ! "
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button
          size={"lg"}
          className="cursor-pointer"
          type="submit"
          variant={"lightRed"}
        >
          Add New Task
        </Button>
      </form>

      <ul className="mt-10 flex flex-col gap-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              layout
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeInOut }}
              key={task.id}
            >
              <motion.label
                key={task.id}
                className=" relative overflow-hidden flex items-center gap-4 cursor-pointer text-white font-manrope font-bold bg-white/5 rounded-lg p-3 border-1 border-white/10 xl:max-w-xl xl:mx-auto "
              >
                <div
                  className={
                    task.completed
                      ? "w-full h-10 left-0 absolute bg-gradient-to-r from-white/70 to bg-black blur-[100px]"
                      : "w-full h-10 left-0 absolute bg-gradient-to-r from-red-300 to bg-red-900 blur-[140px] rounded-full"
                  }
                ></div>
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <motion.span
                  animate={
                    task.completed
                      ? { scale: 0.8, opacity: 0.5 }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.3 }}
                  className={task.completed ? "line-through" : ""}
                >
                  {task.text}
                </motion.span>
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{
                    rotate: [0, -3, 3, -3, 3, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    ease: easeInOut,
                  }}
                  className="absolute right-2 cursor-pointer"
                >
                  <Button
                    className="cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                    variant={"lightRed"}
                  >
                    Delete
                  </Button>
                </motion.div>
              </motion.label>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
