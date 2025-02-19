import moment from 'moment';

export const calculateMoment = async (time) => {

    const dateNow = await moment();  

    const day = await dateNow.get('date');
    console.log("day", day)
    const hour = await dateNow.get('hour');
    console.log("hour", hour)
    const minutes = await dateNow.get('minute');
    const seconds = await dateNow.get('second');
    
    if (time.dDisplay > 0) {
        let newDay = await day + Number(time.dDisplay)
        dateNow.set('date', newDay);
    }

    if (time.hDisplay > 0) {
        let newHour = await hour + Number(time.hDisplay)
        await dateNow.set('hour', newHour);
    }

    if (time.mDisplay > 0) {
        let newMinutes = await minutes + Number(time.mDisplay)
        await dateNow.set('minute', newMinutes);
    }

    if (time.sDisplay > 0) {
        let newSeconds = await seconds + Number(time.sDisplay)
        await dateNow.set('second', newSeconds);
    }
    
    return (
        dateNow
    )
}