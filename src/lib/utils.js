function normalizeTime(time){
    if(!time) return ''
    let v = time.replace(/[^0-9]/g, '')
    if(v.length === 2 && +time > 23) return ''
    if(v.length < 3) v += '00'
    if(v.length === 3) v = '0' + v
    return v.slice(0,-2) + ':' + v.slice(-2)
}

function validateTime(hours, minutes){
  if(!hours || hours > 23 || hours < 1) return false
  if(minutes > 59 || minutes < 0) return false
  return true
}

function getElapsedTime(measured, start){
    if(!measured || !start) return
    let msplit, ssplit, hm, mm, hs, ms, hdiff, sdiff
    msplit = normalizeTime(measured).split(':')
    ssplit = normalizeTime(start).split(':')
    hm = +msplit[0]
    mm = +msplit[1]
    hs = +ssplit[0]
    ms = +ssplit[1]

    if(!validateTime(hm, mm)) return
    if(!validateTime(hs, ms)) return

    if(hm < hs || (hm === hs && mm < ms)){
      hm+=12
    }

    hdiff = hm - hs
    sdiff = mm - ms

    if (sdiff < 0) {
      sdiff = 60 + sdiff
      hdiff -= 1
    }

    return hdiff + sdiff/60
  }

  function getEndTime(start, total){
    if(!start || !total) return
    let hs, ms, ht, mt, ssplit, hadd, madd
    start = normalizeTime(start)
    if(!start) return
    ssplit = start.split(':')
    hs = +ssplit[0]
    ms = +ssplit[1]
    ht = Math.floor(total)
    mt = Math.floor(total%1*60)
    hadd = hs + ht
    madd = ms + mt
    if(madd > 59){
      madd -= 60
      hadd++
    }
    hadd %= 12
    return `${hadd}:${madd < 10 ? '0': ''}${madd}`
  }

export { normalizeTime, getElapsedTime, getEndTime }
