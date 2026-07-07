import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaController } from './biblioteca.controller';
import { BibliotecaService } from './biblioteca.service';

describe('BibliotecaController', () => {
  let controller: BibliotecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibliotecaController],
      providers: [BibliotecaService],
    }).compile();

    controller = module.get<BibliotecaController>(BibliotecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
