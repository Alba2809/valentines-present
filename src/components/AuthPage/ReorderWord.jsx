import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";

function ReorderWord({ originalWord, handleReorder, indexOriginalWord }) {
  const [items, setItems] = useState([]);
  const [allowDrag, setAllowDrag] = useState(
    originalWord.length === 1 ? false : true
  );

  useEffect(() => {
    let letters = originalWord?.split("").map((char, index) => ({
      id: `${char}-${index}`, // Genera un ID único combinando la letra y su índice
      char, // La letra original
    }));

    if (originalWord?.length > 2) {
      // Mezclar hasta que sea diferente al original
      let shuffled;
      do {
        shuffled = [...letters].sort(() => Math.random() - 0.5);
      } while (shuffled.map((item) => item.char).join("") === originalWord);
      letters = shuffled;
    }

    if (originalWord?.length === 2) {
      // Invertir el orden si son dos letras
      letters = [letters[1], letters[0]];
    }

    if (originalWord?.length === 1) {
      handleReorder(indexOriginalWord, true);
    }

    setItems(letters || []);
  }, [originalWord]);

  const handleDragEnd = (newItems) => {
    // Verifica si el orden actual coincide con el original
    const isOrdered =
      newItems.map((item) => item.char).join("") === originalWord;

    setAllowDrag(!isOrdered);

    handleReorder(indexOriginalWord, isOrdered);
  };

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={setItems}
      className="flex gap-2"
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          // drag={allowDrag ? "x" : ""}
          className={`w-[35px] h-[45px] md:w-[25px] md:h-[40px] rounded-lg border-2 border-neutral-400 dark:border-gray-700 text-center text-2xl text-slate-800 dark:text-gray-100 bg-transparent flex items-center justify-center ${ allowDrag ? "cursor-grab" : "cursor-default"}`}
          onDragEnd={() => handleDragEnd(items)}
        >
          <p className="font-hachi" style={{ fontSize: "2.5vh" }}>{item.char}</p>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default ReorderWord;
