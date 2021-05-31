package controller;

import com.github.pagehelper.PageInfo;
import entity.Examples;
import entity.PageInfoOfFNE;
import org.springframework.web.bind.annotation.*;
import service.ExamplesService;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/examples")
public class ExamplesController {
    @Resource
    ExamplesService examplesService;

    //查询工程案例（逆序 有关键字）
    @RequestMapping(value = "/selectExamples", method = RequestMethod.POST)
    public @ResponseBody
    PageInfo<Examples> selectExamples(@RequestBody PageInfoOfFNE pageInfoOfFNE){
        return examplesService.selectExamples(pageInfoOfFNE);
    }

    //查询工程案例（逆序 无关键字）
    @RequestMapping(value = "/selectExamplesByTypeAndArea",method = RequestMethod.POST)
    public  @ResponseBody PageInfo<Examples> selectExamplesByTypeAndArea(@RequestBody PageInfoOfFNE pageInfoOfFNE){
        return examplesService.selectExamplesByTypeAndArea(pageInfoOfFNE);
    }

    //查看工程案例详情
    @RequestMapping(value = "/selectExamplesById", method = RequestMethod.POST)
    public  @ResponseBody Examples selectExamplesById(@RequestBody Examples examples){
        return examplesService.selectExamplesById(examples.getId());
    }

    //删除工程案例
    @RequestMapping(value = "/deleteExamples", method = RequestMethod.POST)
    public @ResponseBody Boolean deleteExamples( @RequestBody  List<Integer> id){
        return examplesService.deleteExamples(id);
    }

    //添加工程案例
    @RequestMapping(value = "/insertExamples", method = RequestMethod.POST)
    public @ResponseBody Boolean insertExamples( @RequestBody Examples examples){
        return examplesService.insertExamples(examples);
    }

    //修改工程案例
    @RequestMapping(value = "/updateExamples", method = RequestMethod.POST)
    public @ResponseBody Boolean updateExamples(@RequestBody Examples examples){
        return examplesService.updateExamples(examples);
    }
}
