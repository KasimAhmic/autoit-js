//@ts-check
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const srcDir = join(process.cwd(), 'src');

const files = readdirSync(srcDir, { withFileTypes: true, recursive: true });

const cppFiles = files.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.cpp'));

const sources = cppFiles.map((dirent) => join(dirent.path, dirent.name).replace(/\\/g, '/'));

process.stdout.write(sources.join(' '));
