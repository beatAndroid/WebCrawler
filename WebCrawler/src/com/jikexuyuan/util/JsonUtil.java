 /**  
 *@Description:     
 */ 
package com.jikexuyuan.util;  

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
  
/**
 * Json格式转化工具类  
 * @author Mr.Yang
 *
 */
public class JsonUtil {
	//默认json字符串，null值或错误的情况下返回该值
	private static final String noData = "{\"result\" : null}";
	private static ObjectMapper mapper;
	
	static {
		mapper = new ObjectMapper();
		//如果属性值为空，直接忽略
		mapper.setSerializationInclusion(Include.NON_NULL);
	}

	/**
	 * @param object
	 * @return
	 * @Author:lulei  
	 * @Description: 将object转化为json字符串
	 */
	public static String parseJson(Object object) {
		if (object == null) {
			return noData;
		}
		try {
			return mapper.writeValueAsString(object);
		} catch (Exception e) {
			e.printStackTrace();
			return noData;
		}
	}
	
	/**
	 * @param json
	 * @return
	 * @Author:lulei  
	 * @Description: 将json字符串转化为JsonNode
	 */
	public JsonNode json2Object (String json) {
		try {
			return mapper.readTree(json);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/***
	 * @param obj
	 * @param root
	 * @return 当解析失败返回{datas:null}
	 * @Author: lulei  
	 * @Description:给定java对象生成对应json,可以指定一个json的root名
	 */
	public static String parseJson(Object obj, String root){
		
		if(obj == null){
			return noData;
		}
		
		try {
			StringBuilder sb = new StringBuilder();
			sb.append("{\"");
			sb.append(root);
			sb.append("\":");
			sb.append(mapper.writeValueAsString(obj));
			sb.append("}");
			return sb.toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return noData;
		}
	}
	
	/***
	 * @param json
	 * @param var
	 * @return 若传入var为null，则默认变量名为datas
	 * @Author: lulei  
	 * @Description:将json字符串包装成jsonp，例如var data={}方式
	 */
	public static String wrapperJsonp(String json, String var){
		if(var == null){
			var = "datas";
		}
		return new StringBuilder().append("var ").append(var).append("=").append(json).toString();
	}
	/**  
	 * @param args
	 * @Author:lulei  
	 * @Description:  
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub  

	}

}
