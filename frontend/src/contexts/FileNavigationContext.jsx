import { createContext, useContext, useEffect, useState } from 'react';

// ADDED BY MOHSE --- START
import { useFileManagerContext } from './../../../../../front-archiver/src/app/dashboard/(archive-managment)/_providers/useFilemanagerContext';
// ADDED BY MOHSE --- END
import { useFiles } from './FilesContext';

const FileNavigationContext = createContext();

export const FileNavigationProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentPathFiles, setCurrentPathFiles] = useState([]);
  const { files } = useFiles();

  // ADDED BY MOHSE --- START
  const context = useFileManagerContext();
  useEffect(() => {
    console.log(currentFolder, currentPath);
    context.setCurrent((prevState) => {
      return { ...prevState, folder: currentFolder, path: currentPath };
    });
  }, [currentFolder]);
  // ADDED BY MOHSE --- END

  useEffect(() => {
    // ADDED BY MOHSE --- START
    console.log(currentFolder, currentPath);
    // ADDED BY MOHSE --- END
    context.setCurrent((prevState) => {
      return { ...prevState, folder: currentFolder, path: currentPath };
    });
    if (Array.isArray(files) && files.length > 0) {
      setCurrentPathFiles(() => {
        return files.filter((file) => file.path === `${currentPath}/${file.name}`);
      });

      setCurrentFolder(() => {
        return files.find((file) => file.path === currentPath) ?? null;
      });
    }
  }, [files, currentPath]);

  return (
    <FileNavigationContext.Provider
      value={{
        currentPath,
        setCurrentPath,
        currentFolder,
        setCurrentFolder,
        currentPathFiles,
        setCurrentPathFiles,
      }}
    >
      {children}
    </FileNavigationContext.Provider>
  );
};

export const useFileNavigation = () => useContext(FileNavigationContext);
