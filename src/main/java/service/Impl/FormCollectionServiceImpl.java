package service.Impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import dao.FormcollectionMapper;
import entity.Formcollection;
import entity.FormcollectionExample;
import entity.PageInfoOfFNE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.FormCollectionService;

import java.util.List;

@Service
public class FormCollectionServiceImpl implements FormCollectionService {
    @Autowired
    FormcollectionMapper formcollectionMapper;

    @Override
    public int insertForm(Formcollection formcollection) {
        formcollectionMapper.insertSelective(formcollection);
        return 0;
    }

//  根据输入的页数和关键字查询form
    @Override
    public PageInfo<Formcollection> selectForm(PageInfoOfFNE pageInfoOfFormAndNew) {
        int pageNum = pageInfoOfFormAndNew.getPageNum();
        String keyword = "";

        //如果输入值为空，则转换成“”，默认查询所有内容
        if(pageInfoOfFormAndNew.getKeyWords() != null){
            keyword = pageInfoOfFormAndNew.getKeyWords();
        }
        FormcollectionExample example = new FormcollectionExample();
        FormcollectionExample.Criteria criteriaName = example.createCriteria();
        FormcollectionExample.Criteria criteriaPhone = example.createCriteria();
        FormcollectionExample.Criteria criteriaLocation = example.createCriteria();
        FormcollectionExample.Criteria criteriaArea = example.createCriteria();

        criteriaName.andNameLike("%"+keyword+"%");
        criteriaPhone.andPhoneLike("%"+keyword+"%");
        criteriaLocation.andLocationLike("%"+keyword+"%");

        example.or(criteriaPhone);
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
        PageHelper.startPage(pageNum,7);

        List<Formcollection> list = formcollectionMapper.selectByExample(example);
        PageInfo<Formcollection> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    @Override
    public Boolean deleteForm(List<Integer> id) {
        for(Integer formId : id){
            formcollectionMapper.deleteByPrimaryKey(formId);
        }
        return true;
    }

    @Override
    public int countForm() {
        FormcollectionExample example = new FormcollectionExample();
        FormcollectionExample.Criteria criteria = example.createCriteria();
        criteria.andIdIsNotNull();
        int num = formcollectionMapper.countByExample(example);
        return num;
    }
}
