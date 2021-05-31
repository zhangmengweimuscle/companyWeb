package service.Impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import dao.LinksMapper;
import entity.Links;
import entity.LinksExample;
import entity.PageInfoOfFNE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.LinksService;

import java.util.List;

@Service
public class LinksServiceImpl implements LinksService {
    @Autowired
    LinksMapper linksMapper;

    @Override
    public PageInfo<Links> selectLinks(PageInfoOfFNE pageInfoOfFNE) {
        int pageNum = pageInfoOfFNE.getPageNum();
        String keyword = "";

        //如果输入值为空，则转换成“”，默认查询所有内容
        if(pageInfoOfFNE.getKeyWords() != null){
            keyword = pageInfoOfFNE.getKeyWords();
        }
        LinksExample example = new LinksExample();
        LinksExample.Criteria criteriaName = example.createCriteria();
        LinksExample.Criteria criteriaURL = example.createCriteria();

        criteriaName.andNameLike("%"+keyword+"%");
        criteriaURL.andUrlLike("%"+keyword+"%");

        example.or(criteriaURL);
        PageHelper.startPage(pageNum,7);

        List<Links> list = linksMapper.selectByExample(example);
        PageInfo<Links> pageInfo = new PageInfo<>(list);

        return pageInfo;
    }

    @Override
    public Boolean deleteLinks(List<Integer> id) {
        for(Integer pageId : id){
            linksMapper.deleteByPrimaryKey(pageId);
        }
        return true;
    }

    @Override
    public Boolean insertLinks(Links links) {
        linksMapper.insertSelective(links);
        return true;
    }

    @Override
    public PageInfo<Links> selectAllLinks() {
        LinksExample example = new LinksExample();
        LinksExample.Criteria criteria = example.createCriteria();
        criteria.andIdIsNotNull();

        PageHelper.orderBy("id desc");

        List<Links> list = linksMapper.selectByExample(example);
        PageInfo<Links> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }
}
