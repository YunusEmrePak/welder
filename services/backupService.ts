import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const shareDb = async () => {
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/project_management.db`;
  await Sharing.shareAsync(dbFilePath, {
    dialogTitle: "Backup Your DB: ",
  }).catch((error) => {
    console.log(error);
  });
};

export const importDb = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/octet-stream",
    });

    const uri = result.assets?.at(0)?.uri;
    if (!uri) {
      throw new Error("uri is null");
    }
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/project_management.db`;

    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );

    await FileSystem.copyAsync({
      from: uri,
      to: dbFilePath,
    });

    console.log("Database imported successfully from:", uri);
  } catch (error) {
    console.error("Error importing database: ", error);
  }
};
