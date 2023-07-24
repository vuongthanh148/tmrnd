import * as fs from 'fs';

const createdDiretoryNotExist = async (folderPath: string): Promise<void> => {
  try {
    await fs.promises.access(folderPath);
  } catch (err) {
    const dir = await fs.promises.mkdir(`${folderPath}`, { recursive: true });
    console.log('Directory created successfully', dir);
  }
};

const writeLogToFile = (fileName: string, log: any) => {
  fs.appendFile(
    __dirname + `/../../src/logs/${fileName}.txt`,
    JSON.stringify(log) + '\n',
    (err) => {
      if (err) {
        console.error('Error of write log', err);
      }
    },
  );
};

export const fileCommon = {
  createdDiretoryNotExist,
  writeLogToFile,
};
