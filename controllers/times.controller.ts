import { RequestHandler } from "express";
import { discountFromApis, resetAccountsTime, StartKeepApiOnMode, turnThisOff } from "../times/operations";
import { getRemanigTimeFor, timeStampToHourAndMinute } from "../utils/time";
import { getTimeData } from "../times/manegeTimeJson";

export const turnKeepApiOn: RequestHandler = (req, res) => {
    StartKeepApiOnMode()

    res.send("Iniciado")
}




export const turnOffThisApiController: RequestHandler = (req, res) => {
    turnThisOff()

    res.send("API OFF")
}

export const getLastStart: RequestHandler = (req, res) => {
    const storageLast = new Date(Number(getTimeData().lastStart))
    const brTime = storageLast.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })

    res.send(brTime)
}


export const getLastDiscount: RequestHandler = (req, res) => {
    const storageLast = new Date(Number(getTimeData().lastDiscount))
    const brTime = storageLast.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })

    res.send(brTime)
}


/**
 * Serve para apenas pegar o restante, só não pasasr os parametros
 */
export const getRemanigTimeForThis: RequestHandler = (req, res) => {
    discountFromApis()

    const remaingForThis = getRemanigTimeFor('this')
    
    const { hours, minutes } = timeStampToHourAndMinute(remaingForThis)

    res.send({ hours, minutes })
}


export const getRemanigTimeForMain: RequestHandler = (req, res) => {
    discountFromApis()

    const remaingForThis = getRemanigTimeFor('main')
    
    const { hours, minutes } = timeStampToHourAndMinute(remaingForThis)

    res.send({ hours, minutes })
}


export const getBothRemaningTime: RequestHandler = (req, res) => {
    const remaingForThisTimeStamp = getRemanigTimeFor('this')
    
    const remaingForThis = timeStampToHourAndMinute(remaingForThisTimeStamp)

    const remaingForMainTimeStamp = getRemanigTimeFor('main')
    
    const remaingForMain = timeStampToHourAndMinute(remaingForMainTimeStamp)

    res.send({ 
        main: {
            hours: remaingForMain.hours,
            minutes: remaingForMain.minutes
        },
        this: {
            hours: remaingForThis.hours,
            minutes: remaingForThis.minutes
        }
     })
}


export const updateUsageMiddleware: RequestHandler = (req, res, next) => {
    discountFromApis()
    
    next()
}


export const getThisStatus:RequestHandler = (req, res) => {
    const status = getTimeData().keepThisApiOn

    res.send(status)
}