var investIndex = {

  isLoading: true,

  init: function () {
    var self = this;

    FastClick.attach(document.body);

    self.initPageSlider();

    self.initTabs();

    self.initThreeTabs();

    setTimeout(()=>{
      self.isLoadingOrStarted();
    },500)
    
  },

  initPageSlider: function() {
    new PageSlider({
          pages: $('.page-wrap .page')
      });
  },

  initTabs: function () {
    this.clicksTab($('.page-two-title span'), $('.page-content div'));
  },

  initThreeTabs: function () {
    this.clicksTab($('.page-three-title span'), $('.page-three-content div'));
  },

  clicksTab: function (aSpan, aUl) {
    var i = 0;
    for(i=0; i<aSpan.length; i++) {
        aSpan[i].index = aUl[i].index = i;
        aSpan[i].onclick = function () {
            for(i=0; i<aSpan.length; i++) {
                aSpan[i].className = '';
                aUl[i].className = '';
            }
            this.className = 'on';
            aUl[this.index].className = 'on';
        }
    }
  },

  isLoadingOrStarted: function () {
    var self = this;
    if(self.isLoading == false){
      $('.isStarted').hide();
      $('.start_loading').show();
    }else{
      $('.isStarted').show();
      $('.start_loading').hide();
    }
  }
}

investIndex.init();