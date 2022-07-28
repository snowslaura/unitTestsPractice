import  voucherService  from "../../src/services/voucherService.js"
import voucherRepository from "../../src/repositories/voucherRepository.js"
import { jest } from "@jest/globals"
import prisma from "../../src/config/database.js";

beforeEach(()=>{
  prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE vouchers RESTART IDENTITY`
  ]);
})


describe("create voucher", () => {
  it("should create voucher", async () => {
    const voucher = { id: 1, code: "fjiofhja", discount: 50, used: false };
    jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce(null);
    jest.spyOn(voucherRepository, "createVoucher").mockResolvedValueOnce(voucher);

    await voucherService.createVoucher(voucher.code, voucher.discount);
    expect(voucherRepository.createVoucher).toBeCalledTimes(1);
  })
})