import { BadRequestException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProviderRepository } from './providers.repository';
import { CreateProviderDto } from './dtos/create-provider.dto';

describe('ProvidersService', () => {
  let providersService: ProvidersService;
  let providerRepositoryMock: ProviderRepository;

  beforeEach(() => {
    providerRepositoryMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    } as any;

    providersService = new ProvidersService(providerRepositoryMock);
  });

  describe('createNewProvider', () => {
    it('should create a new provider', async () => {
      const createProviderDto: CreateProviderDto = {
        name: 'test provider',
        code: 'Test',
        url: 'http://test',
      };

      (providerRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        undefined,
      );
      (providerRepositoryMock.create as jest.Mock).mockReturnValueOnce(
        createProviderDto,
      );

      const result = await providersService.createNewProvider(
        createProviderDto,
      );

      expect(result).toEqual(createProviderDto);
      expect(providerRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: createProviderDto.code },
      });
      expect(providerRepositoryMock.create).toHaveBeenCalledWith(
        createProviderDto,
      );
    });

    it('should throw BadRequestException if the code already exists', async () => {
      const createProviderDto: CreateProviderDto = {
        name: 'test provider',
        code: 'Test',
        url: 'http://test',
      };

      (providerRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        createProviderDto,
      );

      await expect(
        providersService.createNewProvider(createProviderDto),
      ).rejects.toThrow(BadRequestException);
      expect(providerRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: createProviderDto.code },
      });
      expect(providerRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  describe('updateProviderById', () => {
    it('should update a provider by ID', async () => {
      const id = 1;
      const dataUpdate = {
        name: 'test',
        code: '1234',
      };

      (providerRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        undefined,
      );
      (providerRepositoryMock.update as jest.Mock).mockResolvedValueOnce(
        {} as any,
      );

      const result = await providersService.updateProviderById(id, dataUpdate);

      expect(result).toEqual({});
      expect(providerRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: dataUpdate['code'] },
      });
      expect(providerRepositoryMock.update).toHaveBeenCalledWith(
        id,
        dataUpdate,
      );
    });

    it('should throw BadRequestException if the code already exists', async () => {
      const id = 1;
      const dataUpdate = {
        code: 'existingCode',
      };

      (providerRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        {} as any,
      );

      await expect(
        providersService.updateProviderById(id, dataUpdate),
      ).rejects.toThrow(BadRequestException);
      expect(providerRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: dataUpdate.code },
      });
      expect(providerRepositoryMock.update).not.toHaveBeenCalled();
    });
  });
});
