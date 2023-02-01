import {mkdir, rm, readFile, writeFile} from "fs/promises";
import {existsSync} from "fs";
import {join} from "path";

async function ifDirNotExistsThenCreate(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir);
  }
}

async function ifDirExistsThenDelete(dir: string) {
  if (existsSync(dir)) {
    await rm(dir, {
      recursive: true,
      force: true
    });
  }
}

async function ifFileExistsThenDelete(file: string) {
  if (existsSync(file)) {
    await rm(file, {
      recursive: true,
      force: true
    });
  }
}

export async function createAttachmentDir() {
  const dir = join(__dirname, "../../attachments");
  await ifDirNotExistsThenCreate(dir);
}

export async function createUserAttachmentDir(userId: number) {
  const dir = join(__dirname, `../../attachments/${userId}`);
  await ifDirNotExistsThenCreate(dir);
}

export async function deleteUserAttachmentDir(userId: number) {
  const dir = join(__dirname, `../../attachments/${userId}`);
  await ifDirExistsThenDelete(dir);
}

export async function createMapAttachmentDir(userId: number, mapId: number) {
  const dir = join(__dirname, `../../attachments/${userId}/${mapId}`);
  await ifDirNotExistsThenCreate(dir);
}

export async function deleteMapAttachmentDir(userId: number, mapId: number) {
  const dir = join(__dirname, `../../attachments/${userId}/${mapId}`);
  await ifDirExistsThenDelete(dir);
}

export async function createNodeAttachmentDir(userId: number, mapId: number, nodeId: number) {
  const dir = join(__dirname, `../../attachments/${userId}/${mapId}/${nodeId}`);
  await ifDirNotExistsThenCreate(dir);
}

export async function deleteNodeAttachmentDir(userId: number, mapId: number, nodeId: number) {
  const dir = join(__dirname, `../../attachments/${userId}/${mapId}/${nodeId}`);
  await ifDirExistsThenDelete(dir);
}

export async function readNodeAttachment(userId: number, mapId: number, nodeId: number, fileName: string) {
  const filePath = join(__dirname, `../../attachments/${userId}/${mapId}/${nodeId}/background/${fileName}`);
  if (existsSync(filePath)) {
    return await readFile(filePath);
  }
}

export function getNodeBackgroundImagePath(userId: number, mapId: number, nodeId: number, fileName: string) {
  return join(__dirname, `../../attachments/${userId}/${mapId}/${nodeId}/${fileName}`);
}

export async function writeNodeAttachment(userId: number, mapId: number, nodeId: number, fileName: string, file: Buffer) {
  const filePath = join(__dirname, `../../attachments/${userId}/${mapId}/${nodeId}/${fileName}`);
  await writeFile(filePath, file);
}

export function getNodeBackgroundURLPath(nodeId: number) {
  return `/node/${nodeId}/background`;
}

export async function removeNodeBackgroundImage(userId: number, mapId: number, nodeId: number, fileName: string) {
  const filepath = getNodeBackgroundImagePath(userId, mapId, nodeId, fileName);
  await ifFileExistsThenDelete(filepath);
}

