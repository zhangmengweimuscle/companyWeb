package controller;

import com.github.pagehelper.PageInfo;
import entity.Formcollection;
import entity.PageInfoOfFNE;
import org.springframework.web.bind.annotation.*;
import service.FormCollectionService;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/formCollection")
public class FormCollectionController {
    @Resource
    private FormCollectionService formCollectionService;

    //添加报价表单
    @RequestMapping(value = "/insertForm", method = RequestMethod.POST)
    public @ResponseBody int insertForm(@RequestBody Formcollection formcollection){
        formCollectionService.insertForm(formcollection);
        return 0;
    }
    //查询报价人数
    @RequestMapping(value = "/countForm", method = RequestMethod.POST)
    public  @ResponseBody int countForm(){
        return formCollectionService.countForm();
    }

    //获取所有报价信息 分页1,7
    @RequestMapping(value = "/selectForm", method = RequestMethod.POST)
    public @ResponseBody PageInfo<Formcollection> selectForm(@RequestBody PageInfoOfFNE pageInfoOfFormAndNew){
        return formCollectionService.selectForm(pageInfoOfFormAndNew);
    }

    //删除报价信息
    @RequestMapping(value = "/deleteForm", method = RequestMethod.POST)
    public @ResponseBody String deleteForm(@RequestBody List<Integer> id){
        if(formCollectionService.deleteForm(id)){
            return "success";
        }
        return "error";
    }

}
