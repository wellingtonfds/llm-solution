import { Prisma } from '@prisma/client';


const measureWithCustomer = Prisma.validator<Prisma.MeasureDefaultArgs>()({
    include: {
        customer: true
    },
})

export type MeasureWithCustomer = Prisma.MeasureGetPayload<typeof measureWithCustomer>