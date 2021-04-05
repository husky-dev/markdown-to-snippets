import program from 'commander';
import { isStr, log, LogLevel } from 'utils';
import { resolve } from 'path';
import { readdirSync, existsSync, readFileSync } from 'fs';
import { mdStrToSnippetsData } from 'lib';

program
  .name(NAME)
  .arguments('[...files]')
  .description(DESCRIPTION, {
    files: 'list of files to convert. The app fill look for the .md files at the current folder by default',
  })
  .version(VERSION, '-v, --version', 'output the current version')
  .option('-r, --root', 'specify a root folder for .md files', 'current folder')
  .option('-o, --output', 'specify an output folder for snippets files', 'current folder')
  .option('--debug', 'output extra debugging');

// Commands

const convertCmd = (opts: Record<string, unknown>, args: string[]) => {
  if (opts.debug === true) {
    log.setLevel(LogLevel.trace);
  }
  log.debug('opts:', JSON.stringify(opts));
  log.debug('args:', JSON.stringify(args));
  const rootPath = getRootPath(opts);
  log.debug('root path:', rootPath);
  const outPath = getOutputPath(opts);
  log.debug('out path:', outPath);
  const files = getFilesList(opts, args);
  log.debug('input files:', JSON.stringify(files));
  for (const inFile of files) {
    log.debug('parsing ', inFile);
    const str = readFileSync(inFile, 'utf-8');
    const snippets = mdStrToSnippetsData(str);
    log.debug('snippets found:', snippets.length);
  }
};

const getFilesList = (opts: Record<string, unknown>, args: string[]): string[] => {
  const rootPath = getRootPath(opts);
  if (args.length) {
    const filePaths = args.map(itm => resolve(rootPath, itm));
    checkFilesExistance(filePaths);
    return filePaths;
  } else {
    const files = readdirSync(rootPath).filter(itm => /\.md$/g.test(itm.toLowerCase()));
    const filePaths = files.map(itm => resolve(rootPath, itm));
    return filePaths;
  }
};

const getRootPath = (opts: Record<string, unknown>) => (isStr(opts.root) ? resolve(process.cwd(), opts.root) : process.cwd());

const getOutputPath = (opts: Record<string, unknown>) =>
  isStr(opts.output) ? resolve(process.cwd(), opts.output) : process.cwd();

const checkFilesExistance = (files: string[]) => {
  for (const file of files) {
    if (!existsSync(file)) {
      log.errAndExit(`file "${file}" not found`);
    }
  }
};

// Start

program.parse(process.argv);
convertCmd(program.opts(), program.args);
