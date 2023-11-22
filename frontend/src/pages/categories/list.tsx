import React from 'react';
import { useState } from 'react';

interface Category {
    id: number,
    name: string,
}

function ListCategories() {
    const [ categories, setCategories ] = useState<Category[]>([
        {
            id: 1,
            name: "ma catégorie 1",
          },
          {
            id: 2,
            name: "ma catégorie 2",
          },
          {
            id: 3,
            name: "ma catégorie 3",
          },
    ]);
    const [ newCategoryName, setNewCategoryName ] = useState<string>('');
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ actualId, setActualId ] = useState<number>();
    const resetForm = () => {
        setEditMode(false);
        setActualId(undefined);
        setNewCategoryName('');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editMode) {
            setCategories(categories.map((c) => {
                if (c.id === actualId) {
                    return {
                        ...c,
                        name: newCategoryName,
                    };
                }
                return c;
            })
          );
          resetForm();
        } else {
            const newId = categories[categories.length - 1]?.id + 1;
            setCategories([...categories, { id: newId, name: newCategoryName }]);
            setNewCategoryName('');
        }
    };
    
    const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(e.target.value);
    }
    
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.dataset.id;
        if (id) {
            const newList = categories.filter((c) => c.id !== +id);
            setCategories(newList);
        }
    }
    
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.dataset.id;
        if (id) {
          if (actualId && +id === actualId) {
            resetForm();
          } else {
            setEditMode(true);
            setActualId(+id);
            let category = categories.find((c) => c.id == +id);
            if (category) {
                setNewCategoryName(category?.name);
            }
          }
        }
      };
    

    return (
      <div>
        <div>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        {/*<button onClick={() => handleDelete(category.id)}>Delete</button>*/}
                        <button data-id={category.id} 
                            onClick={handleDelete}
                            disabled={editMode && category.id === actualId}>
                            Delete
                        </button>
                        <button data-id={category.id}
                            onClick={handleEdit}>
                            {category.id === actualId ? "Cancel" : "Edit"}
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder='write the name of your category'
                    onChange={handleNewName}
                    value={newCategoryName}
                />
                <button>{editMode ? "Edit": "Add a Category"}</button>
            </form>
        </div>
      </div>
    );
  }
  
  export default ListCategories;