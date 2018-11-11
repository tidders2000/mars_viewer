  describe("Mars", function() {

    describe("nancheck function", function() {
      it("should return an alert", function() {
        spyOn(window, "alert");
        nancheck('word')
        expect(window.alert).toHaveBeenCalledWith('PLEASE ENTER A NUMBER')
      });

    });

    describe("reset_light function", function() {
      it("should change image src", function() {

        $('#pan').attr("src", "Assets/images/pan-yellow.png")

        reset_light()

        expect($('#pan').attr('src')).toBe('Assets/images/pan.png')


      })
    });

    describe("manifest function", function() {
      it("should set manifest values", function() {

        expect('#info').not.toBeEmpty()

      })

      xit("should append instruct", function() {

        expect($('#instruct')).toExist()

      });

    });

    describe("add page image function", function() {
      it('load an image to a div', function() {

        var data = ['http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00400/opgs/edr/fcam/FRB_432995716EDR_F0160148FHAZ00323M_.JPG']
        addPageImage(data)

        expect($('#mars_pic').attr('src')).toBe('http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00400/opgs/edr/fcam/FRB_432995716EDR_F0160148FHAZ00323M_.JPG')
      })

    })

    describe("up function", function() {
      it('triggers a click handler', function() {
        callback = function(up) {}
        spyOn(window, 'callback');

        $link = ($('#up'));
        $link.click(function() {
          callback('up');
        })

        $link.click();

        expect(window.callback).toHaveBeenCalledWith('up');
       

      });

    })
    
     describe("down function", function() {
      it('triggers a click handler', function() {
        callback = function(down) {}
        spyOn(window, 'callback');

        $link = ($('#down'));
        $link.click(function() {
          callback('down');
        })

        $link.click();

        expect(window.callback).toHaveBeenCalledWith('down');
       

      });

    })

  });
  