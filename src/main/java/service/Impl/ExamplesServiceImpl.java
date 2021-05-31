package service.Impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import dao.ExamplesMapper;
import entity.Examples;
import entity.ExamplesExample;
import entity.PageInfoOfFNE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.ExamplesService;

import java.util.List;

@Service
public class ExamplesServiceImpl implements ExamplesService {
    @Autowired
    ExamplesMapper examplesMapper;

    //查询工程案例 有关键字搜索
    @Override
    public PageInfo<Examples> selectExamples(PageInfoOfFNE pageInfoOfFNE) {
        int pageNum = pageInfoOfFNE.getPageNum();
        String keyword = "";
        if(pageInfoOfFNE.getKeyWords() != null){
            keyword = pageInfoOfFNE.getKeyWords();
        }
        ExamplesExample example = new ExamplesExample();
        ExamplesExample.Criteria criteriaTitle = example.createCriteria();
        ExamplesExample.Criteria criteriaType = example.createCriteria();
        ExamplesExample.Criteria criteriaLocation = example.createCriteria();
        ExamplesExample.Criteria criteriaArea = example.createCriteria();

        criteriaTitle.andTitleLike("%"+keyword+"%");
        criteriaType.andTypeLike("%"+keyword+"%");
        criteriaLocation.andLocationLike("%"+keyword+"%");

        example.or(criteriaType);
        example.or(criteriaLocation);

        //测试查询的关键字是不是area，如果keyword是纯数字，则返回true
        boolean keywordIsArea = true;
        for (int i = 0; i < keyword.length(); i++){
            if (!Character.isDigit(keyword.charAt(i))){
                keywordIsArea = false;
                break;
            }
        }
        if(keywordIsArea && !keyword.equals("")){
            int area = Integer.parseInt(keyword);
            criteriaArea.andAreaEqualTo(area);
            example.or(criteriaArea);
        }

        PageHelper.startPage(pageNum,6);
        PageHelper.orderBy("id desc");

        List<Examples> list = examplesMapper.selectByExample(example);
        PageInfo<Examples> pageInfo = new PageInfo<>(list);

        return pageInfo;
    }

    //查询工程案例 没有关键字搜索
    @Override
    public PageInfo<Examples> selectExamplesByTypeAndArea(PageInfoOfFNE pageInfoOfFNE) {
        ExamplesExample example = new ExamplesExample();
        ExamplesExample.Criteria criteriaTypeAndArea = example.createCriteria();

        criteriaTypeAndArea.andTypeLike("%"+pageInfoOfFNE.getType()+"%");
        if(pageInfoOfFNE.getArea() == 0){
            criteriaTypeAndArea.andAreaIsNotNull();
        }else if(pageInfoOfFNE.getArea() == 100){
            criteriaTypeAndArea.andAreaLessThan(100);
        }else if(pageInfoOfFNE.getArea() ==101){
            criteriaTypeAndArea.andAreaBetween(101,150);
        }else{
            criteriaTypeAndArea.andAreaGreaterThan(150);
        }

        PageHelper.startPage(pageInfoOfFNE.getPageNum(),6);
        PageHelper.orderBy("id desc");

        List<Examples> list = examplesMapper.selectByExample(example);
        PageInfo<Examples> pageInfo = new PageInfo<>(list);

        return pageInfo;
    }

    //根据id查找工程案例，用于详情页面的展示
    @Override
    public Examples selectExamplesById(Integer id) {
        return examplesMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean deleteExamples(List<Integer> id) {
        for(Integer examplesId : id){
            examplesMapper.deleteByPrimaryKey(examplesId);
        }
        return true;
    }

    @Override
    public Boolean insertExamples(Examples examples) {
        examplesMapper.insertSelective(examples);
        return true;
    }

    @Override
    public Boolean updateExamples(Examples examples) {
        examplesMapper.updateByPrimaryKeySelective(examples);
        return true;
    }
}
