package dao;

import java.util.List;

import entity.Formcollection;
import entity.FormcollectionExample;
import org.apache.ibatis.annotations.Param;

public interface FormcollectionMapper {
    int countByExample(FormcollectionExample example);

    int deleteByExample(FormcollectionExample example);

    int deleteByPrimaryKey(int id);

    int insert(Formcollection record);

    int insertSelective(Formcollection record);

    List<Formcollection> selectByExample(FormcollectionExample example);

    Formcollection selectByPrimaryKey(int id);

    int updateByExampleSelective(@Param("record") Formcollection record, @Param("example") FormcollectionExample example);

    int updateByExample(@Param("record") Formcollection record, @Param("example") FormcollectionExample example);

    int updateByPrimaryKeySelective(Formcollection record);

    int updateByPrimaryKey(Formcollection record);
}