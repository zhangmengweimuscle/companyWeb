package service;

import com.github.pagehelper.PageInfo;
import entity.Formcollection;
import entity.PageInfoOfFNE;

import java.util.List;

public interface FormCollectionService {
    int insertForm(Formcollection formcollection);
    PageInfo<Formcollection> selectForm(PageInfoOfFNE pageInfoOfFormAndNew);
    Boolean deleteForm(List<Integer> id);
    int countForm();
}
