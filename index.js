/**
 * Created by cuikai on 2015/9/28.
 */


module.exports = function (ret, conf, settings, opt) {


    for(var subpath in ret.src) {
        var file = ret.src[subpath];
        //console.log("info-output>>  file:"+file.subpath);

        //css文件不可能引用js模块，所以不做处理
        if(fis.util.isTextFile(file.fullname)){
            var content = file.getContent();
            content=content.replace(/\b_ALIAS_MAP_\b/g, function () {
                return JSON.stringify(fis._ckdata.allAlias, null, file.optimizer ? null : 4);
            });

            content=content.replace(/\b_MODULE_MAP_\b/g, function () {
                return JSON.stringify(fis._ckdata.allModules, null, file.optimizer ? null : 4);
            });

            file.setContent(content);
        }
    }

}