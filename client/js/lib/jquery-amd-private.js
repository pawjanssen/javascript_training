define(['jquery'], function (jq) {
    // Retourneer jquery in noconflict mode, zodat er geen global $ en 'jquery' vars zijn
    return jq.noConflict(true);
});