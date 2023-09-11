import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file, @Body() body: any) {
    console.log(
      '🚀 ~ file: upload.controller.ts:18 ~ UploadController ~ create ~ file:',
      file,
    );
    console.log(
      '🚀 ~ file: upload.controller.ts:10 ~ UploadController ~ create ~ body:',
      body,
    );

    return 'ok33';
  }
}
