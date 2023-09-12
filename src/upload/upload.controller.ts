/**
 * @ Author: firstfu
 * @ Create Time: 2023-09-09 01:35:53
 * @ Description: 檔案上傳
 */

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 單一檔案上傳
  @Post('/singleFile')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file:', file);
    return file;
  }

  //   單一欄位之多個檔案上傳
  @Post('/multipleFile')
  @UseInterceptors(FilesInterceptor('files'))
  multipleFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('files:', files);
    return files;
  }

  //   多欄位之多個檔案上傳
  @Post('/multipleFileField')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'file1' }, { name: 'file2' }]),
  )
  multipleFileField(
    @UploadedFiles() files: { [x: string]: Express.Multer.File[] },
  ) {
    console.log('files:', files);
    return files;
  }

  //   不分欄位之多個檔案上傳
  @Post('/anyMultipleField')
  @UseInterceptors(AnyFilesInterceptor())
  anyMultipleField(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('files:', files);
    return files;
  }
}
