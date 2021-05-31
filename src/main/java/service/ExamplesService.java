package service;

import com.github.pagehelper.PageInfo;
import entity.Examples;
import entity.PageInfoOfFNE;

import java.util.List;

public interface ExamplesService {
    PageInfo<Examples> selectExamples(PageInfoOfFNE pageInfoOfFNE);
    PageInfo<Examples> selectExamplesByTypeAndArea(PageInfoOfFNE pageInfoOfFNE);
    Examples selectExamplesById(Integer id);
    Boolean deleteExamples(List<Integer> id);
    Boolean insertExamples(Examples examples);
    Boolean updateExamples(Examples examples);
}
