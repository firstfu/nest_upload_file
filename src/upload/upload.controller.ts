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
  Body,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

import { writeFile } from 'fs/promises';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 單一檔案上傳
  @Post('/singleFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file:', file);
    console.log(file.buffer);
    const rs = await writeFile(
      `./public/uploads/${file.originalname}`,
      file.buffer,
    );
    return rs;
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
  anyMultipleField(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    console.log('body:', body);
    console.log(body.name, body.address);
    console.log('files:', files);
    return {
      ...files,
      ...body,
    };
  }
}
