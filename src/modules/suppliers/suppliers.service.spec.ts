import { BadRequestException } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SupplierRepository } from './suppliers.repository';
import { CreateSupplierDto } from './dtos/create-supplier.dto';

describe('SuppliersService', () => {
  let suppliersService: SuppliersService;
  let supplierRepositoryMock: SupplierRepository;

  beforeEach(() => {
    supplierRepositoryMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    } as any;

    suppliersService = new SuppliersService(supplierRepositoryMock);
  });

  describe('createNewSupplier', () => {
    it('should create a new supplier', async () => {
      const createSupplierDto: CreateSupplierDto = {
        name: 'test supplier',
        code: 'Test',
        url: 'http://test',
      };

      (supplierRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        undefined,
      );
      (supplierRepositoryMock.create as jest.Mock).mockReturnValueOnce(
        createSupplierDto,
      );

      const result = await suppliersService.createNewSupllier(
        createSupplierDto,
      );

      expect(result).toEqual(createSupplierDto);
      expect(supplierRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: createSupplierDto.code },
      });
      expect(supplierRepositoryMock.create).toHaveBeenCalledWith(
        createSupplierDto,
      );
    });

    it('should throw BadRequestException if the code already exists', async () => {
      const createSupplierDto: CreateSupplierDto = {
        name: 'test supplier',
        code: 'Test',
        url: 'http://test',
      };

      (supplierRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        createSupplierDto,
      );

      await expect(
        suppliersService.createNewSupllier(createSupplierDto),
      ).rejects.toThrow(BadRequestException);
      expect(supplierRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: createSupplierDto.code },
      });
      expect(supplierRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  describe('updateSupplierById', () => {
    it('should update a supplier by ID', async () => {
      const id = 1;
      const dataUpdate = {
        name: 'test',
        code: '1234',
      };

      (supplierRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        undefined,
      );
      (supplierRepositoryMock.update as jest.Mock).mockResolvedValueOnce(
        {} as any,
      );

      const result = await suppliersService.updateSupplierById(id, dataUpdate);

      expect(result).toEqual({});
      expect(supplierRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: dataUpdate['code'] },
      });
      expect(supplierRepositoryMock.update).toHaveBeenCalledWith(
        id,
        dataUpdate,
      );
    });

    it('should throw BadRequestException if the code already exists', async () => {
      const id = 1;
      const dataUpdate = {
        code: 'existingCode',
      };

      (supplierRepositoryMock.findOne as jest.Mock).mockResolvedValueOnce(
        {} as any,
      );

      await expect(
        suppliersService.updateSupplierById(id, dataUpdate),
      ).rejects.toThrow(BadRequestException);
      expect(supplierRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { code: dataUpdate.code },
      });
      expect(supplierRepositoryMock.update).not.toHaveBeenCalled();
    });
  });
});
