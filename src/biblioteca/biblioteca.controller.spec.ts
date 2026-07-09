import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaController } from './biblioteca.controller';
import { beforeEach, describe, it } from 'node:test';

describe('BibliotecaController', () => {
  let controller: BibliotecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibliotecaController],
    }).compile();

    controller = module.get<BibliotecaController>(BibliotecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
