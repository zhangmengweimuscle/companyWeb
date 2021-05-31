package service;

import com.github.pagehelper.PageInfo;
import entity.Links;
import entity.PageInfoOfFNE;

import java.util.List;

public interface LinksService {
    PageInfo<Links> selectLinks(PageInfoOfFNE pageInfoOfFNE);
    Boolean deleteLinks(List<Integer> id);
    Boolean insertLinks(Links links);
    PageInfo<Links> selectAllLinks();

}
