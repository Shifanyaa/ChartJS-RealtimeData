export const load = async ({ fetch }) => {
    const lightningRes = await fetch('/src/data/ngxdata.json')
    const lightningData = await lightningRes.json()
    const lightningStrikes = lightningData.StrikeData

    return{
        lightningStrikes: lightningStrikes
    }
}