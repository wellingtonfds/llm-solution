import { Prisma } from '@prisma/client';


const customerWithMeasure = Prisma.validator<Prisma.CustomerDefaultArgs>()({
    include: {
        measures: true
    },
})

export type CustomerWithMeasure = Prisma.CustomerGetPayload<typeof customerWithMeasure>