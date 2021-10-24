var bs = require("black-scholes");
const moment = require("moment");

const MAX_HEADERS = 15;
const MAX_ROWS = 30;

function estimateOptionPrice({
  underlyingPrice,
  strike,
  exerciceTimestamp,
  expirationTimestamp,
  implied_volatility,
  riskFreeRate,
  type,
}) {
  const timeToExpire = computeTimeToExpire(
    exerciceTimestamp,
    expirationTimestamp
  );
  const estimatePrice = bs.blackScholes(
    underlyingPrice,
    strike,
    timeToExpire,
    implied_volatility,
    riskFreeRate,
    type
  );
  return estimatePrice;
}

function computeTimeToExpire(exerciceTimestamp, expirationDate) {
  const timeRemaining = expirationDate - exerciceTimestamp;
  if (timeRemaining < 0) return;
  const timeToExpire = timeRemaining / 31536000000;
  return timeToExpire;
}

function drawData(optionData, beginPrice, endPrice) {
  let { option } = optionData;
  let data = {};
  let incrementPrice = Math.round((endPrice - beginPrice) / MAX_ROWS, 2);
  let incrementDate = Math.round(
    (option.expirationTimestamp - Date.now()) / MAX_HEADERS,
    0
  );

  let initDate = Date.now();
  for (let price = beginPrice; price < endPrice; price += incrementPrice) {
    data[price] = {};
    for (
      let date = initDate;
      date < option.expirationTimestamp;
      date += incrementDate
    ) {
      const readableDate = moment(date).format("DDMM");
      data[price][date] = estimateOptionPrice({
        ...option,
        exerciceTimestamp: date,
        underlyingPrice: Math.round(price, 0),
      });
    }
  }
  // format table
  return data;
}

module.exports = async (req, res) => {
  let { option, beginPrice: beginPrice, endPrice } = req.body;
  beginPrice = parseInt(beginPrice);
  endPrice = parseInt(endPrice);
  if (!option) {
    return res.status(422).send("Option not selected");
  }

  try {
    // const response = drawData(option, beginPrice, endPrice);

    const response = {
      50000: {
        1635081654972: 5481.021115419348,
        1635955891307: 5118.78797675412,
        1636830127642: 4747.829314283916,
        1637704363977: 4367.755589466495,
        1638578600312: 3978.2101960269993,
        1639452836647: 3578.9133141588336,
        1640327072982: 3169.739089101895,
        1641201309317: 2750.853725275245,
        1642075545652: 2322.969240428465,
        1642949781987: 1887.8273046724044,
        1643824018322: 1449.1674761205577,
        1644698254657: 1014.7863406715769,
        1645572490992: 601.2420756218207,
        1646446727327: 245.2796474290467,
        1647320963662: 27.54882162860531,
        1648195199997: 0,
      },
      52333: {
        1635081654975: 6396.306167332028,
        1635955891310: 6007.624375876156,
        1636830127645: 5608.1673064612205,
        1637704363980: 5197.209179969439,
        1638578600315: 4773.971821628033,
        1639452836650: 4337.638605442244,
        1640327072985: 3887.3881489048435,
        1641201309320: 3422.4678153562327,
        1642075545655: 2942.34956155462,
        1642949781990: 2447.0633319965364,
        1643824018325: 1937.936193980322,
        1644698254660: 1419.333929774124,
        1645572490995: 903.1458103284904,
        1646446727330: 421.77658246787996,
        1647320963665: 69.25002894922568,
      },
      54666: {
        1635081654975: 7384.189813994235,
        1635955891310: 6971.081613799499,
        1636830127645: 6545.285018682878,
        1637704363980: 6105.749123197025,
        1638578600315: 5651.283900367533,
        1639452836650: 5180.541649895336,
        1640327072985: 4692.002021568782,
        1641201309320: 4183.9703560290145,
        1642075545655: 3654.613393998048,
        1642949781990: 3102.0931926919875,
        1643824018325: 2524.9617482038884,
        1644698254660: 1923.288930855204,
        1645572490995: 1302.0784232784717,
        1646446727330: 683.0632360563195,
        1647320963665: 154.7308286641005,
      },
      56999: {
        1635081654976: 8442.642018866762,
        1635955891311: 8007.27043462047,
        1636830127646: 7557.473448413177,
        1637704363981: 7091.898265933371,
        1638578600316: 6608.969647764476,
        1639452836651: 6106.838715715086,
        1640327072986: 5583.318126130063,
        1641201309321: 5035.801506650718,
        1642075545656: 4461.168908591058,
        1642949781991: 3855.6946856106097,
        1643824018326: 3215.0257872149195,
        1644698254661: 2534.486896353592,
        1645572490996: 1810.7396645490444,
        1646446727331: 1049.6675429358656,
        1647320963666: 312.00567535479604,
      },
      59332: {
        1635081654976: 9569.375276075614,
        1635955891311: 9113.987590288161,
        1636830127646: 8642.64274137808,
        1637704363981: 8153.718880181568,
        1638578600316: 7645.295805732661,
        1639452836651: 7115.073143255846,
        1640327072986: 6560.258127321977,
        1641201309321: 5977.408790815243,
        1642075545656: 5362.2108710106295,
        1642949781991: 4709.1562964450495,
        1643824018326: 4011.0821913620202,
        1644698254661: 3258.5557725458166,
        1645572490996: 2439.3669680429684,
        1646446727331: 1540.4792275414766,
        1647320963666: 575.2874378008446,
      },
      61665: {
        1635081654977: 10761.912747211678,
        1635955891312: 10288.791997588327,
        1636830127647: 9798.407187839872,
        1637704363982: 9288.907304209519,
        1638578600317: 8758.07760799916,
        1639452836652: 8203.230956627813,
        1640327072987: 7621.053679434339,
        1641201309322: 7007.3806198129205,
        1642075545657: 6356.855572775792,
        1642949781992: 5662.398149517194,
        1643824018327: 4914.327358938248,
        1644698254662: 4098.8443912325965,
        1645572490997: 3195.276595787607,
        1646446727332: 2171.1789093269253,
        1647320963667: 981.1119731293111,
      },
      63998: {
        1635081654978: 12017.646719392087,
        1635955891313: 11529.070982062913,
        1636830127648: 11022.16030986287,
        1637704363983: 10494.87906817416,
        1638578600318: 9944.77525592416,
        1639452836653: 9368.850041632912,
        1640327072988: 8763.369491716734,
        1641201309323: 8123.58375266314,
        1642075545658: 7443.291260333055,
        1642949781993: 6714.128871846267,
        1643824018328: 5924.343276953103,
        1644698254663: 5056.492104752953,
        1645572490998: 4082.671279497903,
        1646446727333: 2953.0826934706383,
        1647320963668: 1563.2207463531631,
      },
      66331: {
        1635081654978: 13333.888084257127,
        1635955891313: 12832.097050566106,
        1636830127648: 12311.14009820572,
        1637704363983: 11768.844001787049,
        1638578600318: 11202.58058474127,
        1639452836653: 10609.120379586519,
        1640327072988: 9984.419465216586,
        1641201309323: 9323.297887662437,
        1642075545658: 8618.933494581317,
        1642949781993: 7862.022312693054,
        1643824018328: 7039.289735245864,
        1644698254663: 6130.607927029141,
        1645572490998: 5102.690152278112,
        1646446727333: 3892.5219517542246,
        1647320963668: 2347.5787056257614,
      },
      68664: {
        1635081654979: 14707.907683442838,
        1635955891314: 14195.075886776234,
        1636830127649: 13662.4848508545,
        1637704363984: 13107.871399984906,
        1638578600319: 12528.493421232306,
        1639452836654: 11920.973962574113,
        1640327072989: 11281.073188466402,
        1641201309324: 10603.342607134568,
        1642075545659: 9880.577427361968,
        1642949781994: 9102.900958980794,
        1643824018329: 8256.124283694044,
        1644698254664: 7318.525144283911,
        1645572490999: 6253.6538386887805,
        1646446727334: 4990.767854287948,
        1647320963669: 3348.832212026806,
      },
      70997: {
        1635081654979: 16136.970414136824,
        1635955891314: 15615.18638958811,
        1636830127649: 15073.280296392022,
        1637704363984: 14508.945697432668,
        1638578600319: 13919.387704390541,
        1639452836654: 13301.163852810303,
        1640327072989: 12649.951278725133,
        1641201309324: 11960.193582482603,
        1642075545659: 11224.541295008265,
        1642949781994: 10432.915918749593,
        1643824018329: 9570.832005160748,
        1644698254664: 8616.099231130858,
        1645572490999: 7531.447005995411,
        1646446727334: 6244.422894544747,
        1647320963669: 4568.960741678493,
      },
      73330: {
        1635081654980: 17618.362960595907,
        1635955891315: 17089.61360042109,
        1636830127650: 16540.598787468833,
        1637704363985: 15969.013311774306,
        1638578600320: 15372.06780082715,
        1639452836655: 14746.332423378179,
        1640327072990: 14087.508936171893,
        1641201309325: 13390.086266468003,
        1642075545660: 12646.797377581039,
        1642949781995: 11847.716170082138,
        1643824018330: 10978.651088531959,
        1644698254665: 10018.021408098779,
        1645572491000: 8929.98023170964,
        1646446727335: 7646.149550443792,
        1647320963670: 5998.1519390258545,
      },
      75663: {
        1635081654981: 19149.416007040985,
        1635955891316: 18615.57539313504,
        1636830127651: 18061.531432526135,
        1637704363986: 17485.02147829939,
        1638578600321: 16883.315725340726,
        1639452836656: 16253.06926588028,
        1640327072991: 15590.107777847108,
        1641201309326: 14889.106376752286,
        1642075545661: 14143.088327544116,
        1642949781996: 13342.602325631764,
        1643824018331: 12474.284126744147,
        1644698254666: 11518.126062354306,
        1645572491001: 10441.679742551736,
        1646446727336: 9185.58977021325,
        1647320963671: 7617.343082152838,
      },
      77996: {
        1635081654984: 20727.521692495597,
        1635955891319: 20190.34372785309,
        1636830127654: 19633.213996395534,
        1637704363989: 19053.949914427998,
        1638578600324: 18449.93007377872,
        1639452836659: 17817.959470878828,
        1640327072994: 17154.076429507826,
        1641201309329: 16453.267186946105,
        1642075545664: 15709.027970366493,
        1642949781999: 14912.662175845522,
        1643824018334: 14052.088496635282,
        1644698254669: 13109.676248927535,
        1645572491004: 12057.964021188207,
        1646446727339: 10850.340166417809,
        1647320963674: 9401.592577739648,
      },
      80329: {
        1635081654985: 22350.147029090636,
        1635955891320: 21811.26124606636,
        1636830127655: 21252.847400665494,
        1637704363990: 20672.836190567694,
        1638578600325: 20068.75757244618,
        1639452836660: 19437.62317634617,
        1640327072995: 18775.760689106886,
        1641201309330: 18078.574214149696,
        1642075545665: 17340.18665024462,
        1642949782000: 16552.886944216327,
        1643824018335: 15706.242158531204,
        1644698254670: 14785.61715424851,
        1645572491005: 13769.678148057254,
        1646446727340: 12626.876180137879,
        1647320963675: 11323.47446769428,
      },
      82662: {
        1635081654986: 24014.843892230776,
        1635955891321: 23475.753876791692,
        1636830127656: 22917.713558553645,
        1637704363991: 22338.795608499357,
        1638578600326: 21736.718108468995,
        1639452836661: 21108.747299113413,
        1640327072996: 20451.564195319996,
        1641201309331: 19761.078181923447,
        1642075545666: 19032.16178329187,
        1642949782001: 18258.26832949229,
        1643824018336: 17430.88345303996,
        1644698254671: 16538.792081947104,
        1645572491006: 15567.467893375462,
        1646446727341: 14501.353339812369,
        1647320963676: 13355.918081182877,
      },
      84995: {
        1635081654987: 25719.25616313782,
        1635955891322: 25181.340099382927,
        1636830127657: 24625.187262643056,
        1637704363992: 24049.03638635957,
        1638578600327: 23450.824128250984,
        1639452836662: 22828.110429295404,
        1640327072997: 22177.98067157533,
        1641201309332: 21496.917399712336,
        1642075545667: 20780.63476734703,
        1642949782002: 20023.87732286229,
        1643824018337: 19220.225262751293,
        1644698254672: 18362.119354503506,
        1645572491007: 17442.08523702534,
        1646446727342: 16460.24766087148,
        1647320963677: 15474.208812225741,
      },
      87328: {
        1635081654987: 27461.124491745788,
        1635955891322: 26925.63739326992,
        1636830127657: 26372.744727828627,
        1637704363992: 25800.870836249982,
        1638578600327: 25208.19518743344,
        1639452836662: 24592.601784287217,
        1640327072997: 23951.61877269522,
        1641201309332: 23282.350732811567,
        1642075545667: 22581.41557773746,
        1642949782002: 21844.92626316112,
        1643824018337: 21068.645017908573,
        1644698254672: 20248.731187890306,
        1645572491007: 19384.624309071543,
        1646446727342: 18490.825033590096,
        1647320963677: 17657.120514751026,
      },
      89661: {
        1635081654988: 29238.289103773626,
        1635955891323: 28706.36635819282,
        1636830127658: 28157.969343722463,
        1637704363993: 27591.723173181555,
        1638578600328: 27006.068393119553,
        1639452836663: 26399.235087993846,
        1640327072998: 25769.220554913692,
        1641201309333: 25113.78237954575,
        1642075545668: 24430.476518177973,
        1642949782003: 23716.815933176265,
        1643824018338: 22970.75280773145,
        1644698254673: 22192.07748256506,
        1645572491008: 21386.691998037524,
        1646446727343: 20581.449559999804,
        1647320963678: 19887.315759690566,
      },
      91994: {
        1635081654988: 31048.69102149792,
        1635955891323: 30521.3529297313,
        1636830127658: 29978.55512779294,
        1637704363993: 29419.134527651753,
        1638578600328: 28841.805411018162,
        1639452836663: 28245.158174687844,
        1640327072998: 27627.674532652738,
        1641201309333: 26987.779637939013,
        1642075545668: 26323.97661377104,
        1642949782003: 25635.16963424172,
        1643824018338: 24921.44026376711,
        1644698254673: 24185.99857449079,
        1645572491008: 23440.52071241459,
        1646446727343: 22721.7530445124,
        1647320963678: 22151.2229824683,
      },
      94327: {
        1635081654989: 32890.37199068713,
        1635955891324: 32368.529031906328,
        1636830127659: 31832.308281151083,
        1637704363994: 31280.76563825892,
        1638578600329: 30712.89660793489,
        1639452836664: 30127.65900937673,
        1640327072999: 29524.024175431194,
        1641201309334: 28901.084738156133,
        1642075545669: 28258.278045809428,
        1642949782004: 27595.85614185399,
        1643824018339: 26915.912984163093,
        1644698254674: 26224.77146071197,
        1645572491009: 25539.03236692908,
        1646446727344: 24902.693453691572,
        1647320963679: 24438.601929212542,
      },
      96660: {
        1635081654989: 34761.473393630156,
        1635955891324: 34245.931991766316,
        1636830127659: 33717.14722712069,
        1637704363994: 33174.39767346697,
        1638578600329: 32616.962866673603,
        1639452836664: 32044.16877675197,
        1640327072999: 31455.472652191645,
        1641201309334: 30850.621766107426,
        1642075545669: 30229.955977017366,
        1642949782004: 29595.003406085976,
        1643824018339: 28949.70927266847,
        1644698254674: 28303.134146651835,
        1645572491009: 27675.863140512025,
        1646446727344: 27116.53098232428,
        1647320963679: 26741.971024999963,
      },
      98993: {
        1635081654990: 36660.234349509105,
        1635955891325: 36151.70295573262,
        1636830127660: 35631.10142017286,
        1637704363995: 35097.93153049328,
        1638578600330: 34551.755499273306,
        1639452836665: 33992.26256793663,
        1640327073000: 33419.384493674064,
        1641201309335: 32833.49955063926,
        1642075545670: 32235.802943596063,
        1642949782005: 31629.00466536647,
        1643824018340: 31018.70774231183,
        1644698254675: 30416.292489910316,
        1645572491010: 29845.358084322623,
        1646446727345: 29356.74790574574,
        1647320963680: 29056.01807339223,
      },
      101326: {
        1635081654991: 38584.98920517523,
        1635955891326: 38084.08454530634,
        1636830127661: 37572.30920575563,
        1637704363996: 37049.38594620325,
        1638578600331: 36515.15466382635,
        1639452836666: 35969.658163861815,
        1640327073001: 35413.28480035208,
        1641201309336: 34847.01132636953,
        1642075545671: 34272.82890546959,
        1642949782006: 33694.518519137775,
        1643824018341: 33119.12614282079,
        1644698254676: 32559.913570271914,
        1645572491011: 32042.543791275762,
        1646446727346: 31617.93434171297,
        1647320963681: 31377.06615913412,
      },
      103659: {
        1635081654991: 40534.164555528245,
        1635955891326: 40041.41792027479,
        1636830127661: 39539.01493541848,
        1637704363996: 39026.89467070161,
        1638578600331: 38505.166595989824,
        1639452836666: 37974.21330739379,
        1640327073001: 37434.85650031467,
        1641201309336: 36888.63183866015,
        1642075545671: 36338.257867954184,
        1642949782006: 35788.46427476696,
        1643824018341: 35247.51344544946,
        1644698254676: 34730.10907355998,
        1645572491011: 34263.08611205454,
        1646446727346: 33895.65729049606,
        1647320963681: 33702.62785154082,
      },
      105992: {
        1635081654992: 42506.27592710688,
        1635955891327: 42022.13940828937,
        1636830127662: 41529.56552775822,
        1637704363997: 41028.70293456159,
        1638578600332: 40519.91993889171,
        1639452836667: 40003.921818667455,
        1640327073002: 39481.936109582435,
        1641201309337: 38956.01248466391,
        1642075545672: 38429.52188355085,
        1642949782007: 37908.01372553666,
        1643824018342: 37400.73695665536,
        1644698254677: 36923.411675060685,
        1645572491012: 36503.23867043025,
        1646446727347: 36186.32575698558,
        1647320963682: 36031.054800987884,
      },
      108325: {
        1635081654992: 44499.92423534337,
        1635955891327: 44024.77683261438,
        1636830127662: 43542.40663378704,
        1637704363997: 43053.16340257484,
        1638578600332: 42557.66140914534,
        1639452836667: 42056.90885152624,
        1640327073002: 41552.50837618234,
        1641201309337: 41046.9749920076,
        1642075545672: 40544.253117354005,
        1642949782007: 40050.58033585299,
        1643824018342: 39575.965945467426,
        1644698254677: 39136.746881359024,
        1645572491012: 38759.786706506784,
        1646446727347: 38487.06070845331,
        1647320963682: 38361.2749278023,
      },
      110658: {
        1635081654993: 46513.792087441216,
        1635955891328: 46047.94562762239,
        1636830127663: 45576.07851852568,
        1637704363998: 45098.73175437936,
        1638578600333: 44616.75097679376,
        1639452836668: 44131.42551930076,
        1640327073003: 43644.70010612577,
        1641201309338: 43159.504033848265,
        1642075545673: 42680.27452621582,
        1642949782008: 42213.806624685676,
        1643824018343: 41770.652985531,
        1644698254678: 41367.402284642616,
        1645572491013: 41029.98965804519,
        1646446727348: 40795.575304107886,
        1647320963683: 40692.60269342773,
      },
      112991: {
        1635081654993: 48546.64001765863,
        1635955891328: 48090.34484405851,
        1636830127663: 47629.21177993895,
        1637704363998: 47163.962037444835,
        1638578600333: 46695.6567364101,
        1639452836668: 46225.84310956197,
        1640327073003: 45756.773449273474,
        1641201309338: 45291.73914143255,
        1642075545673: 44835.58963636497,
        1642949782008: 44395.5504249426,
        1643824018343: 43982.51400836703,
        1644698254678: 43612.9957799669,
        1645572491013: 43311.524965779274,
        1646446727348: 43110.0683094174,
        1647320963683: 43024.606453506305,
      },
      115324: {
        1635081654994: 50597.30269360041,
        1635955891329: 50150.75309474203,
        1636830127664: 49700.522971135906,
        1637704363999: 49247.50187794022,
        1638578600334: 48792.94958056125,
        1639452836669: 48338.647033469315,
        1640327073004: 47887.11883806151,
        1641201309339: 47441.9661743514,
        1642075545674: 47008.3717786039,
        1642949782009: 46593.87052952166,
        1643824018344: 46209.50782024446,
        1644698254679: 45871.443887745845,
        1645572491014: 45602.434775102345,
        1646446727349: 45429.1317533806,
        1647320963684: 45357.01822795888,
      },
      117657: {
        1635081654994: 52664.68515515125,
        1635955891329: 52228.024512727534,
        1636830127664: 51788.81021082607,
        1637704363999: 51348.08765094366,
        1638578600334: 50907.297798409745,
        1639452836669: 50468.430660694896,
        1640327073004: 50034.247768344314,
        1641201309339: 49608.60859119767,
        1642075545674: 49196.95310081026,
        1642949782009: 48807.01215820613,
        1643824018344: 48449.81568995108,
        1644698254679: 48140.93103851251,
        1645572491014: 47901.07660411326,
        1646446727349: 47751.67265952214,
        1647320963684: 47689.67377202856,
      },
      119990: {
        1635081654995: 54747.759104247816,
        1635955891330: 54321.084748161615,
        1636830127665: 53892.94881841169,
        1637704364000: 53464.53965935463,
        1638578600335: 53037.46166569929,
        1639452836670: 52613.8891285453,
        1640327073005: 52196.785541257246,
        1641201309340: 51790.21868143003,
        1642075545675: 51399.813577818175,
        1642949782010: 51033.39255057141,
        1643824018345: 50701.82143284168,
        1644698254680: 50419.880390435355,
        1645572491015: 50206.07854327226,
        1646446727350: 50076.84789573074,
        1647320963685: 50022.47359691393,
      },
    };
    return res.status(200).send(response);
  } catch (error) {
    console.error({ error });
    return res.status(500).send(error);
  }
};
